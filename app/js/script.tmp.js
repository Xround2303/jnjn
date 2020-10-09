/*_self.objectView = [];
this.objectManager.objects.each(function (object) {

    let objectState = _self.objectManager.getObjectState(object.id);
    let bounds = _self.map.getBounds();
    let contains = ymaps.util.bounds.containsPoint(bounds, object.geometry.coordinates);

    if (objectState.isShown && contains) {
        _self.objectView.push(object.id);
    }

});
console.log("Точки в зоне видимости:", _self.objectView);*/