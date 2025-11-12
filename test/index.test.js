const assert = require('assert');
const { convert } = require('../index');

describe('json-to-bubble-object', () => {

  it('returns empty object for non-object inputs', () => {
    assert.deepStrictEqual(convert(null), {});
    assert.deepStrictEqual(convert(undefined), {});
    assert.deepStrictEqual(convert([]), {});
  });

  it('converts flat object using default prefix', () => {
    const input = { a: 1, b: 'x' };
    const expected = { '_p_a': 1, '_p_b': 'x' };
    assert.deepStrictEqual(convert(input), expected);
  });

  it('uses provided valid param_prefix', () => {
    const input = { a: 1 };
    assert.deepStrictEqual(convert(input, '_api_c2_'), { '_api_c2_a': 1 });
  });

  it('defaults to _p_ for invalid param_prefix', () => {
    const input = { a: 2 };
    assert.deepStrictEqual(convert(input, 'invalid'), { '_p_a': 2 });
  });

  it('converts nested objects to dotted keys', () => {
    const input = { a: { b: 2 } };
    const expected = { '_p_a.b': 2 };
    assert.deepStrictEqual(convert(input), expected);
  });

  it('handles arrays of primitives and arrays of objects', () => {
    const input = { list: [1, 2], items: [{ id: 1 }] };
    const result = convert(input);

    assert.deepStrictEqual(result['_p_list'], [1, 2]);
    // note: current implementation converts objects inside arrays using the prefix again for keys
    assert.deepStrictEqual(result['_p_items'], [{ '_p_id': 1 }]);
  });

  it('converts keys containing dots (e.g. @odata.context and @odata.etag) from a sample OData response', () => {
    const sample = {
      "@odata.context": "https://orgd404a818.crm4.dynamics.com/api/data/v9.2/$metadata#accounts",
      "value": [
        {
          "@odata.etag": "W/\"3618151\"",
          "name": "A. Datum Corporationddddd (sample)"
        }
      ]
    };

    const out = convert(sample);

    // top-level @odata.context -> _p_@odata__dot__context
    assert.strictEqual(out['_p_@odata__dot__context'], sample['@odata.context']);

    // value is converted to an array under _p_value and its first element should have converted @odata.etag
    assert.ok(Array.isArray(out['_p_value']), 'expected _p_value to be an array');
    const first = out['_p_value'][0];
    assert.strictEqual(first['_p_@odata__dot__etag'], "W/\"3618151\"");
    assert.strictEqual(first['_p_name'], 'A. Datum Corporationddddd (sample)');
  });

  it('only converts dots to __dot__ and keeps other special characters intact (prefix added)', () => {
    const sample = {
      "@metadata.context": "testing at symbol and dot",
      "field-with-dash": "testing hyphen/dash",
      "field/with/slash": "testing forward slash",
      "field\\with\\backslash": "testing backslash",
      "field with space": "testing space",
      "field*with*asterisk": "testing asterisk",
      "field?with?question": "testing question mark",
      "field:with:colon": "testing colon",
      "field$with$dollar": "testing dollar sign",
      "field#with#hash": "testing hash/pound",
      "field%with%percent": "testing percent",
      "field&with&ampersand": "testing ampersand",
      "field+with+plus": "testing plus",
      "field=with=equals": "testing equals",
      "field|with|pipe": "testing pipe",
      "field<with>angles": "testing angle brackets",
      "field[with]brackets": "testing square brackets",
      "field{with}braces": "testing curly braces",
      "field(with)parens": "testing parentheses",
      "field'with'apostrophe": "testing apostrophe",
      "field\"with\"quote": "testing double quote",
      "field;with;semicolon": "testing semicolon",
      "field,with,comma": "testing comma",
      "field~with~tilde": "testing tilde",
      "field`with`backtick": "testing backtick",
      "field!with!exclamation": "testing exclamation mark",
      "field^with^caret": "testing caret",
      "multiple@special-chars.test": "testing multiple special chars",
      "normal_field_underscore": "testing underscore (usually allowed)",
      "normalField123": "testing normal alphanumeric",
      "value": [
        {
          "@nested.field": "nested with special chars",
          "nested-dash": "nested dash value",
          "nested/slash": "nested slash value"
        }
      ]
    };

    const out = convert(sample);

    // Dot-only conversions
    assert.strictEqual(out['_p_@metadata__dot__context'], sample['@metadata.context']);

    // Other special characters should be preserved in the key name (only prefix added)
    assert.strictEqual(out['_p_field-with-dash'], sample['field-with-dash']);
    assert.strictEqual(out['_p_field/with/slash'], sample['field/with/slash']);
    assert.strictEqual(out['_p_field\\with\\backslash'], sample['field\\with\\backslash']);
    assert.strictEqual(out['_p_field with space'], sample['field with space']);
    assert.strictEqual(out['_p_multiple@special-chars__dot__test'], sample['multiple@special-chars.test']);

    // Check nested object inside value array: dot converted, other chars preserved
    assert.ok(Array.isArray(out['_p_value']), 'expected _p_value to be an array');
    const nested = out['_p_value'][0];
    assert.strictEqual(nested['_p_@nested__dot__field'], 'nested with special chars');
    assert.strictEqual(nested['_p_nested-dash'], 'nested dash value');
    assert.strictEqual(nested['_p_nested/slash'], 'nested slash value');
  });

});
