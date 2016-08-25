function Set() {
    var items = {};//用对象来作为集合的数据结构，防止了值的重复
    this.has = function (value) {//检查值是否在集合中
        return items.hasOwnProperty(value);
    };
    this.add = function (value) {//如果存在同名属性，则不添加，其实不用检测也可以
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };
    this.remove = function (value) {//移除集合中指定的元素
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };
    this.clear = function () {//清空集合
        items = {};
    };
    this.size = function () {//返回集合的长度
        return Object.keys(items).length;
    };
    /*
    this.sizeLegacy = function () {
        var count = 0;
        for (var prop in items) {
            if (items.hasOwnProperty(prop)) {
                count++;
            }
        }
        return count;
    };
    */
    this.values = function () {//返回集合的数组表示
        return Object.keys(items);
    };
    /*
    this.valuesLegacy = function () {
        var keys = [];
        for (var prop in items) {
            if (items.hasOwnProperty(prop)) {
                keys.push(prop);
            }
        }
        return keys;
    };
    */
    this.union = function (otherSet) {//并集
        var unionSet = new Set();
        var values = this.values();
        for (var i=0; i<values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (var i=0; i<values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    };
    this.intersection = function (otherSet) {//交集
        var intersectionSet = new Set();
        var values = this.values();
        for (var i=0; i<values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    };
    this.difference = function (otherSet) {//差集this - otherSet
        var differenceSet = new Set();
        var values = this.values();
        for (var i=0; i<values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    };
    this.subset = function (otherSet) {//子集，this是otherSet的子集
        if (this.size() > otherSet.size()) {//首先验证this的大小
            return false;
        } else {
            var values = this.values();
            for (var i=0; i<values.length; i++) {
                if (!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    };
}
