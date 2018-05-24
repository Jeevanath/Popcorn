var config = {
    apiKey: "AIzaSyDyjWDq5oqbUQ181_YGi4TylTO8hlB98cs",
    authDomain: "sample-da149.firebaseapp.com",
    databaseURL: "https://sample-da149.firebaseio.com",
    projectId: "sample-da149",
    storageBucket: "sample-da149.appspot.com",
    messagingSenderId: "848704810717"
  };
  firebase.initializeApp(config);

var list=[];
var ref = firebase.database().ref().child("FarmHarvest/");
ref.on('value',function(data)
{
      var inst = data.val();
          
      var keys = Object.keys(inst);
      for(j=1;j<32;j++)
      {
        var count = 0;

      for (var i = 0; i< keys.length; i++)
      {
          var k = keys[i];
          var time = inst[k].Time;
          var city = inst[k].city;
            
          var year =time.slice(11,16);
          var month = time.slice(3,7);  
          var date = month+" "+j+" "+year;
          var r = time.match(date);
          if(r!==null)
          {
            count = count + 1;
          }
        }
       list.push(count);
      }

   console.log(list);



  

      });



  

