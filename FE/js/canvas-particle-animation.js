(function(){
	var canvas = document.getElementById('canvas');
	var ctx = null;
	var random_base , animation_id,cur_time = 0;
	var particles = [];
	if(canvas.getContext){
		ctx = canvas.getContext('2d');
	}

	var image = new Image(),imageW,imageH;
	image.onload = function(){
		ctx.drawImage(image , 100 ,100);
		imageW = image.width;
		imageH = image.height;
		var imageData = ctx.getImageData(100,100,imageW,imageH);
		function calculate(){
			var
				cols = 100 ,
				rows = 100,
				s_width = parseInt(imageW / cols),
				s_height = parseInt(imageH / rows),
				pos = 0,
				par_x ,
				par_y,
				data = imageData.data;
				for(var i = 1 ; i <= cols ; i++){
					for(var j = 1 ; j <= rows ; j++){
						pos = [(j *s_height -1) * imageW  + (i * s_width -1 )] * 4;
						if(data[pos + 3] > 100){
							var particle = {
								x: 100 + i * s_width + (Math.random() - 0.5) * 20,
								y:100 + j * s_height +( Math.random() - 0.5) * 20,
								x_base: 100 + i * s_width,
								y_base: 100 + i * s_height,
								fillStyle: '#006eff',
								cur_time: 0,
								duration_time: 0 ,
								start_x : 200,
								start_y : 400
							};
							if(data[pos+1] < 175 && data[pos+2] < 10) {
								particle.fillStyle = '#ffa900';
							} else if(data[pos+1] < 75 && data[pos+1] > 50) {
								particle.fillStyle = '#ff4085';
							} else if(data[pos+1] < 220 && data[pos+1] > 190) {
								particle.fillStyle = '#00cfff';
							} else if(data[pos+1] < 195 && data[pos+1] > 175) {
								particle.fillStyle = '#9abc1c';
							}
							particle.cur_time = i * 2,
							particle.duration_time = 400 - particle.cur_time;
							particles.push(particle);
						}
					}
				}
		};
		calculate();
		random_base = 200;
		draw_add_time();

	}
	image.src = "../img/isux.png";


	function draw(){
		if(random_base == 20){
			cancelAnimationFrame(animation_id);
		}else{
		ctx.clearRect(0 ,0 ,canvas.width,canvas.height);
		var
			len = particles.length,
			curr_particle = null;

		for(var i = 0 ; i < len ;i++){
			curr_particle = particles[i];
			ctx.fillStyle = particles[i].fillStyle;
			ctx.fillRect(curr_particle.x_base + (Math.random() -0.5) * random_base,curr_particle.y,1,1);
		}
		random_base=random_base - 2;
		requestAnimationFrame(draw);
		}
	}

	function draw_add_time(){
		ctx.clearRect(0,0,ctx.width,ctx.height);

		var
			len = particles.length,
			cur_particle = null,
			cur_x ,
			cur_y,
			duration_time = 0;

			if(particles[len -1].duration_time <cur_time){
				cancelAnimationFrame(animation_id);
				return;
			}else{
				for(var i = 0; i <len ;i++){
					cur_particle = particles[i];
					duration_time = particles.duration_time;
					 if(cur_time < duration_time){
						cur_x = easeOutExpo(cur_time , cur_particle.start_x,cur_particle.x - cur_particle.start_x, duration_time );
						cur_Y = easeOutExpo(cur_time,cur_particle.start_y , cur_particle.y -cur_particle.start_y , duration_time);
						ctx.fillRect(cur_x,cur_y ,1,1);
					}else{
						ctx.fillRect(cur_particle.x,cur_particle.y,1,1);
					}
				}
				cur_time ++;
				animation_id = requestAnimationFrame(draw_add_time);
			}
	}

	/**
	 * [easeOutExpo description]
	 * @param  {[type]} t [动画执行到当前帧所经过的时间]
	 * @param  {[type]} b [起始的值]
	 * @param  {[type]} c [总的位移值]
	 * @param  {[type]} d [持续时间]
	 * @return {[type]}   [经过缓动函数计算后的数值]
	 */
	function easeOutExpo (t,b,c,d){
		t /= d/2;
		if(t < 1){
			return c/2 * Math.pow(2,10 * ( t -1 ) ) + b ;
			t--;
		}
		return c/2 * ( -Math.pow(2, -10 * t) + 2) + b;
	}
})()
