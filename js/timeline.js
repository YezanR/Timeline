/**
   * Get URL parameter
   * http://www.netlobo.com/url_query_string_javascript.html
   */

  $(document).ready(function()
  {
      function gup( name ) {
        name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( window.location.href );
        if( results == null )
          return "";
        else
          return results[1];
      }

      // get selected item count from url parameter
      var count = (Number(gup('count')) || 1000);

      // create groups
      var groups = new vis.DataSet([
        {id: 1, content: 'Lundi'},
        {id: 2, content: 'Mardi'},
        {id: 3, content: 'Mercredi'},
        {id: 4, content: 'Jeudi'},
        {id: 5, content: 'Vendredi'},
        {id: 6, content: 'Samedi'}
      ]);

      // create items
      var items = new vis.DataSet([
          {id: 1, group: 1, content: 'item 1' , description: "sdsdsd", start: moment("08:00", "hh:mm"), end: moment("13:00", "hh:mm")}
      ]);

      // var order = 1;
      // var truck = 1;
      // for (var j = 0; j < 6; j++) {
      //   var date = new Date();
      //   for (var i = 0; i < count/6; i++) {
      //     date.setHours(date.getHours() +  4 * (Math.random() < 0.2));
      //     var start = new Date(date);
      //  var editable = true;
       

      //     date.setHours(date.getHours() + 2 + Math.floor(Math.random()*4));
      //     var end = new Date(date);

      //     items.add({
      //       id: order,
      //       group: truck,
      //       start: start,
      //       end: end,
      //       content: 'Order ' + order,
        
      //     });

      //     order++;
      //   }
      //   truck++;
      // }

      // specify options
      var options = {
          timeAxis: {scale: 'minute', step: 15},
          stack: true,//true => éviter le chauvechement
          start: moment('8:00', "hh:mm"),
          end: moment('18:15', "hh:mm"),//new Date(1000*60*60*24 + (new Date()).valueOf()),
          editable: {
            add: true,  
            updateTime: true,  // drag items horizontally
            updateGroup: true, // drag items from one group to another
            remove: true       // delete an item by tapping the delete button top right
          },
          margin: {
            item: 10, // minimal margin between items
            axis: 5   // minimal margin between items and the axis
          },
          orientation: 'top',
          moveable: false,
          snap: function (date, scale, step) {
                  var fifteenMins = (60 * 60  * 1000)/4;
                  //alert(Math.round(date / hour) * hour);
                  return Math.round(date /fifteenMins) * fifteenMins;
          },
          
          showCurrentTime: false, //enlever la barre rouge qui nous suit partout
          type: 'range',//or box, or bakground, or point
          onAdd: function (item, callback) {
            prettyPrompt('Add item', 'Enter text content for new item:', item.content, function (value) {
              if (value) {
                item.content = value;
                callback(item); // send back adjusted new item
              }
              else {
                callback(null); // cancel item creation
              }
            });
        },

        // onMove: function (item, callback) {
        //   var title = 'Do you really want to move the item to\n' +
        //       'start: ' + item.start + '\n' +
        //       'end: ' + item.end + '?';

        //   prettyConfirm('Move item', title, function (ok) {
        //     if (ok) {
        //       callback(item); // send back item as confirmation (can be changed)
        //     }
        //     else {
        //       callback(null); // cancel editing item
        //     }
        //   });
        // },

        // onMoving: function (item, callback) {
        //   if (item.start < min) item.start = min;
        //   if (item.start > max) item.start = max;
        //   if (item.end   > max) item.end   = max;

        //   callback(item); // send back the (possibly) changed item
        // },

        onUpdate: function (item, callback) {
          prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
            if (value) {
              item.content = value;
              console.log(item.description);
              callback(item); // send back adjusted item
            }
            else {
              callback(null); // cancel updating the item
            }
          });
        },

        onRemove: function (item, callback) {
          prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
            if (ok) {
              callback(item); // confirm deletion
            }
            else {
              callback(null); // cancel deletion
            }
          });
        }
      
      };

      // create a Timeline
      var container = document.getElementById('mytimeline');
      timeline = new vis.Timeline(container, items, options);
      timeline.setGroups(groups);
      //timeline.setItems(items);

      document.getElementById('count').innerHTML = count;
      
      //test add new item
       /**
       * Handle creation and updates of an item on double tap
       * @param event
       * @private
       */
      //  ItemSet.prototype._onAddItem = function (event) {
      //   if (!this.options.selectable) return;
      //   if (!this.options.editable.add) return;

      //   var me = this;
      //   var snap = this.options.snap || null;
      //   var item = this.itemFromTarget(event);

      //   event.stopPropagation();

      //   if (item) {
      //     // update item

      //     // execute async handler to update the item (or cancel it)
      //     var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset
      //     this.options.onUpdate(itemData, function (itemData) {
      //       if (itemData) {
      //         me.itemsData.getDataSet().update(itemData);
      //       }
      //     });
      //   } else {
      //     // add item
      //     var xAbs = util.getAbsoluteLeft(this.dom.frame);
      //     var x = event.center.x - xAbs;
      //     var start = this.body.util.toTime(x);
      //     var scale = this.body.util.getScale();
      //     var step = this.body.util.getStep();

      //     var newItemData = {
      //       start: snap ? snap(start, scale, step) : start,
      //       content: 'new item'
      //     };
     
      //     // when default type is a range, add a default end date to the new item
      //     if (this.options.type === 'range') {
      //       var end = this.body.util.toTime(x + this.props.width / 5);
      //       newItemData.end = snap ? snap(end, scale, step) : end;
      //     }

      //     newItemData[this.itemsData._fieldId] = util.randomUUID();

      //     var group = this.groupFromTarget(event);
      //     if (group) {
      //       newItemData.group = group.groupId;
      //     }

      //     // execute async handler to customize (or cancel) adding an item
      //     newItemData = this._cloneItemData(newItemData); // convert start and end to the correct type
      //     this.options.onAdd(newItemData, function (item) {
      //       if (item) {
      //         me.itemsData.getDataSet().add(item);
      //         // TODO: need to trigger a redraw?
      //       }
      //     });
      //   }
      // };

      function logEvent(event, properties) {
        var log = document.getElementById('log');
        var msg = document.createElement('div');
        msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
            'properties=' + JSON.stringify(properties);
        log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
      }

      function prettyConfirm(title, text, callback) {
        swal({
          title: title,
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: "#DD6B55"
        }, callback);
      }

      function prettyPrompt(title, text, inputValue, callback) {
        swal({
          title: title,
          text: text,
          type: 'input',
          showCancelButton: true,
          inputValue: inputValue
        }, callback);
      }
      
      //end of test add new item



  });

  