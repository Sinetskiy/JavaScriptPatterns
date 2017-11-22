Observable = function() {
    this.status = "construct";
}
Observable.prototype.getStatus = function() {
    return this.status;
}

Observer = function() {
    this.subscriptions = [];
}
Observer.prototype = {
    subscribeTo: function(observable) {
        this.subscriptions.push(observable);
    },
    unsubscribeFrom: function(observable) {
        var i = 0,
            len = this.subscriptions.length;

        // Пробегаем по всему списку и если находим, то что искали,
        // удаляем
        for (; i < len; i++) {
            if (this.subscriptions[i] === observable) {
                this.subscriptions.splice(i, 1);
                // Не стоит искать дальше,
                // если уже нашли то, что искали
                return;
            }
        }
    },
    doSomethingIfOk: function() {
        var i = 0;
        len = this.subscriptions.length;

        // Пробегаемся по списку подписчиков и определяем
        // изменился ли статус на Ок ,
        // и выполняем то, что нужно подписчику, если это так
        for (; i < len; i++) {
            if (this.subscriptions[i].getStatus() === "ok") {
                // Делаем, что нибудь, потому что стутус
                // такой какой нам нужен
                console.log("Status is Ok");
            }
        }
    }
}

var observer = new Observer(),
    observable = new Observable();
observer.subscribeTo(observable);

// Ничего не произойдет так как статус еще не изменен
observer.doSomethingIfOk();

// Изменяем статус на "Ок", чтобы что то произошло
observable.status = "ok";
observer.doSomethingIfOk();