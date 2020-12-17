/**
 * @param {Object} obj
 * @param {string} [param_prefix] - _p_ (default) or _api_c2_.
 * @return {Object}
 */
exports.convert = (obj, param_prefix) => {

    if (typeof obj !== 'object' || (obj && Array.isArray(obj))) return {};

    if (typeof param_prefix !== 'string' || !param_prefix || (typeof param_prefix === 'string' && !['_p_', '_api_c2_'].includes(param_prefix))) param_prefix = '_p_';


    /**
     * @param {Object} obj
     * @param {string} [key_parent]
     * @param {boolean} [is_array]
     * @return {Object}
     */
    const convert = (obj, key_parent, is_array) => {

        let result = {};

        Object.keys(obj).forEach(key => {

            let cell = obj[key], key_new = `${param_prefix}${key}`;

            if (key_parent && !is_array) key_new = `${key_parent}.${key}`;


            if ((!cell && cell !== 0 && cell !== false) || typeof cell === 'undefined') {


                result[key_new] = null

            } else if (typeof cell !== 'object' && !Array.isArray(cell)) {


                result[key_new] = cell

            } else if (typeof cell === 'object' && !Array.isArray(cell)) {


                result = Object.assign(result, convert(cell, key_new))

            } else if (Array.isArray(cell)) {

                if (typeof cell[0] === 'object') {

                    result[key_new] = [];

                    cell.forEach(value => {

                        result[key_new].push(convert(value, key_new, true))
                    })

                } else {

                    // It's not an object array, so treat
                    // it as an array of Bubble primitives.
                    //
                    result[key_new] = cell;
                }
            }
        });


        return result
    };

    return convert(obj)
};
