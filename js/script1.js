// DOM element where the Timeline will be attached

  $( document ).ready(function() {
    var container = document.getElementById('visualization');

  var min = new Date(2013, 3, 1); // 1 april
    var max = new Date(2013, 3, 30, 23, 59, 59); // 30 april	
	
  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: moment('8:00', "hh:mm"), end: moment('9:00', "hh:mm")},
	{id: 2, content: 'item 2', start: moment('9:00', "hh:mm"), end: moment('10:00', "hh:mm")},
	{id: 3, content: 'item 3', start: moment('10:00', "hh:mm"), end: moment('11:00', "hh:mm")},
	{id: 4, content: 'item 4', start: moment('11:00', "hh:mm"), end: moment('12:00', "hh:mm")}
	
	
    // {id: 2, content: 'item 2', start: new Date("9:00:00")},
	// {id: 3, content: 'item 2', start: new Date("10:00:00")},
	// {id: 4, content: 'item 2', start: new Date("11:00:00")}
	
  ]);

  // Configuration for the Timeline
  var options = {
	timeAxis: {scale: 'minute', step: 15},
	moveable: true,
	editable: true,
	multiselect: true,
	 clickToUse: true,
	 type:  'range',
	
	
  };
  var container1 = document.getElementById('visualization1');
 // var container2 = document.getElementById('visualization2');
  //var container3 = document.getElementById('visualization3');
 // var container4 = document.getElementById('visualization4');
 // var container5 = document.getElementById('visualization5');
 // var container6 = document.getElementById('visualization6');
  
  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
 // var timeline = new vis.Timeline(container1, items, options);
 // var timeline = new vis.Timeline(container2, items, options);
 // var timeline = new vis.Timeline(container3, items, options);
 // var timeline = new vis.Timeline(container4, items, options);
  //var timeline = new vis.Timeline(container5, items, options);
 // var timeline = new vis.Timeline(container6, items, options);
  
  //test
  
 
	
  items.on('*', function (event, properties, senderId) {
 //var props = timeline.getEventProperties(event)
 //var itemId = items.selectedIndex.get();//options[container.selectedIndex].value;
 var itemId = timeline.getSelection(); //iktichaf jamiiiiil
 items.update({id: timeline.getSelection(), content: 'updated', start: moment('9:00', "hh:mm")}); // <==== there is a big problem here, try to solve it plzz
 items.get(itemId).content = 'updated';
 
 //document.write('My id is: '+);
 //var e = event;
 //this.innerHTML='hello';
 alert('attention!  '+itemId);
 // console.log(props);
 console.log('event:', items.get(itemId), 'properties:', properties, 'senderId:', senderId);
});


  //end of test
});

  