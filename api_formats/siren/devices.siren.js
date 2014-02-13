module.exports = function(model) {
  var entity = {
    'class': [ 'devices' ],
    'entities': []
  };

  entity.entities = model.entities.map(function(item) {
    var e = {
      'class': [ 'device' ],
      'rel': [ 'http://elroy.io/rels/device', 'item' ],
      'properties': {
        'id': item.id
      },
      'links': [
        {
          'rel': [ 'self' ],
          'href': item.selfUrl
        }
      ]
    };

    return e;
  });

  return entity;
};
