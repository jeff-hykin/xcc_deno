import { setSubtract as subtract } from "https://deno.land/x/good@1.13.0.1/flattened/set_subtract.js"
import { toRepresentation } from "https://deno.land/x/good@1.13.0.1/flattened/to_representation.js"

export function ensureDescriptorAgreement({desiredDescriptors, name, object, markAsNative}) {
    const warnings = []
    // object will be values such as [ Object, Function, Array, Number, String, Boolean, Symbol, Error, Promise ]
    const currentDescriptors = Object.getOwnPropertyDescriptors(object)
    const acceptedKeys = []
    for (const [currentKey, currentDescriptor] of Object.entries(currentDescriptors)) {
        const { value, writable, enumerable, configurable, get, set } = currentDescriptor
        const desiredDescriptor = desiredDescriptors[currentKey]
        
        // remove keys that don't exist in spec
        if (desiredDescriptor === undefined) {
            let failedToDelete = true
            if (currentDescriptor.configurable) {
                try {
                    delete object[currentKey]
                    failedToDelete = false
                } catch (error) {
                }
            }
            if (failedToDelete) {
                warnings.push(`This runtime is not allowing the deletion of ${name}.${currentKey}\nThis is going to cause the runtime to be not 100% deterministic`)
            }
            continue
        }
        
        // 
        // check for basic agreement
        // 
        let needsRedefinition = false
        const desiredHasGetter = desiredDescriptor.get !== undefined
        const desiredHasSetter = desiredDescriptor.set !== undefined
        const currentHasGetter = currentDescriptor.get !== undefined
        const currentHasSetter = currentDescriptor.set !== undefined
        const currentValueType = typeof currentDescriptor.value
        const desiredValueType = typeof desiredDescriptor.value
        
        const disagreement = (
            desiredHasGetter !== currentHasGetter ||
            desiredHasSetter !== currentHasSetter ||
            currentValueType !== desiredValueType ||
            currentDescriptor.writable !== desiredDescriptor.writable ||
            currentDescriptor.enumerable !== desiredDescriptor.enumerable ||
            currentDescriptor.configurable !== desiredDescriptor.configurable ||
            (currentValueType !== 'function' && !Object.is(currentDescriptor.value, desiredDescriptor.value))
        )
        
        if (!disagreement) {
            if (currentHasGetter) {
                markAsNative(`get ${currentKey}`, get)
            }
            if (currentHasSetter) {
                markAsNative(`set ${currentKey}`, set)
            }
            if (currentValueType === 'function') {
                markAsNative(currentKey, value)
            }
            acceptedKeys.push(currentKey)
            continue
        } else {
            // TODO: we can do basic upgrades (e.g. something that was configurable becoming non-configurable)
            warnings.push(`This runtime value of ${name}.${currentKey} is not consistent with the spec\nspec: ${toRepresentation(desiredDescriptor)}\nruntime: ${toRepresentation(currentDescriptor)}`)
        }
    }
    const desiredKeys = Object.keys(desiredDescriptors)
    const hasAllDesiredKeys = acceptedKeys.length == desiredKeys.length
    if (!hasAllDesiredKeys) {
        const remainingKeys = subtract({ value: acceptedKeys, from: desiredKeys })
        const keysThatNeedPolyfills = []
        const descriptorsToDefine = {}
        for (const eachKey of remainingKeys) {
            const desiredDescriptor = desiredDescriptors[eachKey]
            if (desiredDescriptor.get == undefined && desiredDescriptor.set == undefined && typeof desiredDescriptor.value !== 'function') {
                descriptorsToDefine[eachKey] = desiredDescriptor
            } else {
                keysThatNeedPolyfills.push(eachKey)
            }
        }
        // TODO: could do polyfills argument and fill them in here
        if (keysThatNeedPolyfills.length > 0) {
            warnings.push(`This runtime doesn't match the necessary spec. It is missing the following keys from ${name}:\n${[...keysThatNeedPolyfills].join(', ')}`)
        }
    }
    return warnings
}