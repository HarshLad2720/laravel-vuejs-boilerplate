function getFilteredArray(arr, byFilterValue) {
    if(arr && arr.length > 0) {
        return arr.filter(item => {
            // debugger;
            item.name == byFilterValue;
            if(item.name == 'show'){
                item.name = 'can-show';
            }
            return item.name;
        }).reduce((a, c) => Object.assign(a, c), Object.create(null));
    }else {
        return {};
    }
}
export function isPermission(permissions, bindingValue, permissionName) {
    if (bindingValue) {
        let module = getFilteredArray(permissions, bindingValue.module);
        if (module.is_third_level == '1') {
            module = getFilteredArray(module.sub_permissions, bindingValue.subModule);
        }
        let permissionObj = getFilteredArray(module.sub_permissions, permissionName);
        return permissionObj.is_permission == '1';
    }else {
        return true;
    }
}
