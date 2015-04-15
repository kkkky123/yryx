self.onmessage=function(event){
	var jsonText=event.data;
	var jsonData=JSON.parse(jsonText);
	self.postMessage(jsonData);
};