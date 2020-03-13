/* tslint-disabled */
const MAX_MEMORTY_VALUE_LENGTH = 300;
let _store = window.localStorage;
const LEARNTA_PREFIX = '__ta';
let _prefix = `${LEARNTA_PREFIX}/${process.env.REACT_APP}_`;
const _cache = {};
let storage;

try {
    // IE 8 或移动端的隐身模式 下直接调用 window.localStorage 会报错（其实也不用支持 IE8）
    _store.setItem('bs_:)_', '__');
    _store.removeItem('bs_:)_');
} catch (e) {
    /* istanbul ignore next */
    _store = null;
}

if (_store) {
    storage = {
        // 同时更新不同的 Product 下的 storage
        sync(products, fn) {
            const lastPrefix = _prefix;
            products.forEach(product => {
                _prefix = `__ta/${product}_`;
                fn();
            });
            _prefix = lastPrefix;
        },
        set(key, val, seconds) {
            const expiredAt = seconds ? Date.now() + seconds * 1000 : 0;
            const valMod = JSON.stringify([val, expiredAt]);
            if (valMod.length <= MAX_MEMORTY_VALUE_LENGTH) _cache[key] = valMod;
            else delete _cache[key];
            _store.setItem(_prefix + key, valMod);
        },
        setAll(map) {
            Object.keys(map).forEach(key => {
                if (Array.isArray(map[key])) {
                    this.set(key, ...map[key]);
                } else {
                    this.set(key, map[key]);
                }
            });
        },
        get(key, defaultValue) {
            const rawVal = _cache[key] || _store.getItem(_prefix + key);
            if (!rawVal) return defaultValue;

            try {
                const [val, expiredAt] = JSON.parse(rawVal);
                if (expiredAt && Date.now() > expiredAt) {
                    return defaultValue;
                }
                return val;
            } catch (e) {
                return defaultValue;
            }
        },

        del(key) {
            delete _cache[key];
            _store.removeItem(_prefix + key);
        },
        clear() {
            Object.keys(_store).forEach(key => {
                if (key.indexOf(_prefix) > -1) {
                    this.del(key);
                }
            });
        },
        has(key) {
            return key in _cache || !!_store.getItem(_prefix + key);
        }
    };
} else {
    storage = {
        set(key, val) {
            _cache[key] = val;
        },
        get(key) {
            return _cache[key];
        },
        clear() {
            Object.keys(_cache).forEach(key => {
                this.del(key);
            });
        },
        del(key) {
            delete _cache[key];
        },
        has(key) {
            return key in _cache;
        }
    };
}

export default storage;
