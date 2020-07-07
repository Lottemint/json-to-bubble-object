/**
 * @param {Object} obj
 * @return {Object}
 */
exports.convert = (obj) => {

    if (typeof obj !== 'object' || (obj && Array.isArray(obj))) return {};


    /**
     * @param {Object} obj
     * @param {string} [key_parent]
     * @param {boolean} [is_array]
     * @return {Object}
     */
    const convert = (obj, key_parent, is_array) => {

        let result = {};

        Object.keys(obj).forEach(key => {

            let cell = obj[key], key_new = `_p_${key}`;

            if (key_parent && !is_array) key_new = `${key_parent}.${key}`;


            if (!cell || typeof cell === 'undefined') {


                result[key_new] = null

            } else if (typeof cell !== 'object' && !Array.isArray(cell)) {


                result[key_new] = cell

            } else if (typeof cell === 'object' && !Array.isArray(cell)) {


                result = Object.assign(result, convert(cell, key_new))

            } else if (Array.isArray(cell)) {

                result[key_new] = [];

                cell.forEach(value => {

                    result[key_new].push(convert(value, key_new, true))
                })
            }
        });


        return result
    };

    return convert(obj)
};