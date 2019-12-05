function Container(id) {
    this.tagName = 'div';
    this.id = id;
    this.className = 'container';
}

Container.prototype.render = function () {
    var div = document.createElement(this.tagName);
    div.id = this.id;
    div.className = this.className;
    return div;
};

function Menu(className, id, items) {
    Container.call(this);
    this.tagName = 'ul';
    this.className = className;
    this.id = id;
    this.items = items;

}
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var menu = document.createElement(this.tagName);
    menu.className = this.className;
    menu.id = this.id;
    this.items.forEach(function (item) {
        if (item instanceof Container) {
           menu.appendChild(item.render()) ;
        }
    });
    return menu;
};

function MenuItems(href,label) {
    Container.call(this);
    this.tagName = 'li';
    this.className = 'menu-item';
    this.href = href;
    this.label = label;



}
MenuItems.prototype = Object.create(Container.prototype);
MenuItems.prototype.render = function () {
    var li = document.createElement(this.tagName);
    li.className = this.className;
    var a = document.createElement('a');
    a.href = this.href;
    li.textContent = this.label;
    li.appendChild(a);

    return li;
};

function SuperMenu(className, id, items, title, href) {
    Menu.call(this, className, id, items);
    this.title = title;
    this.href = href;
}
SuperMenu.prototype = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
    if(this.title && this.href) {
        var menuItem = new MenuItems(this.href, this.title).render();
        menuItem.appendChild(Menu.prototype.render.call(this));
        return menuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
};