var socket;
window.onload = function(){
	socket = io.connect('http://localhost:8080');
	var field = document.getElementById('field');
	var content = document.getElementById('content');
	var form = document.getElementById('form');
	var messages = [];
	//когда приходит - представиться
	var name = prompt('Как тебя зовут?', 'Гость');
		if(name){
			//посылка сообщения
			socket.emit('hello', {name:name});
			
		}
	
	socket.on('message', function(data){
		if(data.message){
			messages.push(data.message);
			var html = '';
			for(var i=0; i<messages.length; i++){
				html += messages[i] + '<br/>';
			}
			content.innerHTML = html;
		}else{
			console.log('фигня');
		}
		
	});
	
	//обработчик события 'onclick' для html-элемента 'input' c 'id="submit"' (кнопка)
	form.onsubmit = function(){
		var text = field.value;
		socket.emit('send', {message: text});
		return false;		//чтобы не перегружалась страница
	};
};
window.onunload = function(){
	socket.disconnect();
}