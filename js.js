function Container(id, myClass) {
    this.id = id;
    this.myClass = myClass;
}

Container.prototype.render = function () {
    var div = document.createElement('div');
    div.id = this.id;
    div.className = this.myClass;
    return div;
};

function Menu(id, myClass, items) {
    Container.call(this, id, myClass);
    this.items = items;
}
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var ul = document.createElement('ul');
    ul.className = this.myClass;
    this.items.forEach(function (item) {
        if (item instanceof Container) {
           ul.appendChild(item.render()) ;
        }
    });
    return ul;
};

function MenuItems(href,label) {
    Container.call(this, '', 'menu-item');
    this.href = href;
    this.label = label;
}
MenuItems.prototype = Object.create(Container.prototype);
MenuItems.prototype.render = function () {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = this.href;
    li.textContent = this.label;
    li.appendChild(a);
    li.className = this.myClass;
    return li;
};
