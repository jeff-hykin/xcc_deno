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
            (currentValueType !== 'function' && currentDescriptor.value !== desiredDescriptor.value)
        )
        
        if (!disagreement) {
            if (currentHasGetter) {
                markAsNative(`get ${currentKey}`, object[currentKey])
            }
            if (currentHasSetter) {
                markAsNative(`set ${currentKey}`, object[currentKey])
            }
            if (currentValueType === 'function') {
                markAsNative(currentKey, object[currentKey])
            }
            acceptedKeys.push(currentKey)
            continue
        } else {
            // TODO: we can do basic upgrades (e.g. something that was configurable becoming non-configurable)
            warnings.push(`This runtime value of ${name}.${currentKey} is not consistent with the spec\nspec: ${desiredDescriptor}\nruntime: ${currentDescriptor}`)
        }
    }
    const desiredKeys = Object.keys(desiredDescriptors)
    const hasAllDesiredKeys = acceptedKeys.length == desiredKeys.length
    if (!hasAllDesiredKeys) {
        // TODO: could do polyfills for some things here (ex: Error.isError)
        const remainingKeys = subtract({ value: acceptedKeys, from: desiredKeys })
        warnings.push(`This runtime doesn't match the necessary spec. It is missing the following keys from ${name}:\n${[...remainingKeys].join(', ')}`)
    }
    return warnings
}