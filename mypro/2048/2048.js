"use strict";
var game=
{
	
	data:null,//保存rn行 cn列
	RN:4,CN:4,score:0,
	state:1,
	RUNNING:1,
	GAMEOVER:0,

	start:function()
	{
		this.state=this.RUNNING;
		document.getElementById("gameOver").style.display="none";
		this.score=0;
		//document.getElementById("score").innerHTML=9999;


		this.data=[];
		for (var r=0;r<this.RN ;r++ )
		{
			this.data.push([]);
			for (var c=0;c<this.CN ;c++ )
			{
				this.data[r].push(0);
			}
		}
		this.randomNum();
		this.randomNum();
		this.updateView();
		document.onkeydown=function(e)
		{
			//console.log(e);
			switch(e.keyCode)
			{
				case 37:this.moveLeft();break;
				case 38:this.moveUp();break;
				case 39:this.moveRight();break;
				case 40:this.moveDown();break;
			}
		}.bind(this);
	},


	randomNum:function()
	{
		while (true)
		{
			var r=Math.floor(Math.random()*(this.RN));
			var c=Math.floor(Math.random()*(this.CN));
			if (this.data[r][c]===0)
			{
				Math.random()<0.5 ? this.data[r][c]=2 : this.data[r][c]=4;
				break;
			}
		}
	},

	isGAMEOVER:function()
	{
		for (var r=0;r<this.RN;r++ )
		{
			for (var c=0;c<this.CN ;c++ )
			{
				if ((this.data[r][c]==0)||(c<this.CN-1 && this.data[r][c]==this.data[r][c+1])||(r<this.RN-1 && this.data[r][c]==this.data[r+1][c]))
				{
					return false;
				}
			}
		}
		return true;
	},
	updateView:function()
	{
		for (var r=0;r<this.RN ;r++ )
		{
			for (var c=0;c<this.CN ;c++ )
			{
				var div=document.getElementById("c"+r+c);
				if (this.data[r][c]!==0)
				{
					div.innerHTML=this.data[r][c];
					div.className="cell n"+this.data[r][c];
				}
				else
				{
					div.innerHTML="";   //datarc
					div.className="cell";
				}
			}
		}
		document.getElementById("score").innerHTML=this.score;
		if (this.isGAMEOVER())
		{
			this.state=this.GAMEOVER; 
			document.getElementById("final").innerHTML=this.score;
			document.getElementById("gameOver").style.display="block";
		}
	},


	moveLeft:function()
	{
		var before=String(this.data);
		for (var r=0;r<this.RN ;r++ )
		{
			this.moveLeftInRow(r);
		}
		var after=String(this.data);
		if (before!=after)
		{
			this.randomNum();
			this.updateView();
		}
	},


	moveLeftInRow:function (r)
	{
		
		for (var c=0;c<this.CN-1 ;c++ )
		{
			var nextc=this.getNextInRow(r,c);
			if (nextc==-1)
			{
				break;
			}
			else
			{
				if (this.data[r][c]==0)
				{
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					c--;
				}
				else if(this.data[r][c]==this.data[r][nextc])
				{
					this.data[r][c]*= 2;
					this.score+=this.data[r][c];
					this.data[r][nextc]=0;
				}
			}

		}
	},


	getNextInRow:function(r,c)
	{
		for (var nextc=c+1;nextc<this.CN ;nextc++ )
		{
			if (this.data[r][nextc]!=0)
			{
				return nextc
			}
		}
		return -1;
		
	},


	moveRight:function()
	{
		var before=String(this.data);
		for (var r=0;r<this.RN ;r++ )
		{
			this.moveRightInRow(r);
		}
		var after=String(this.data);
		if (before!=after)
		{
			this.randomNum();
			this.updateView();
		}
	},


	moveRightInRow:function (r)
	{
		
		for (var c=this.CN;c>0;c-- )
		{
			var prevc=this.getPrevInRow(r,c);
			if (prevc==-1)
			{
				break;
			}
			else
			{
				if (this.data[r][c]==0)
				{
					this.data[r][c]=this.data[r][prevc];
					this.data[r][prevc]=0;
					c++;
				}
				else if(this.data[r][c]==this.data[r][prevc])
				{
					this.data[r][c]*= 2;
					this.score+=this.data[r][c];
					this.data[r][prevc]=0;
				}
			}

		}
	},


	getPrevInRow:function(r,c)
	{
		for (var prevc=c-1;prevc>-1 ;prevc-- )
		{
			if (this.data[r][prevc]!=0)
			{
				return prevc
			}
		}
		return -1;
		
	},



	moveUp:function()
	{
		var before=String(this.data);
		for (var c=0;c<this.CN ;c++ )
		{
			this.moveUpInCol(c);
		}
		var after=String(this.data);
		if (before!=after)
		{
			this.randomNum();
			this.updateView();
		};
	},
	 


	
	moveUpInCol:function (c){
		
		for (var r=0;r<this.RN-1 ;r++ ){
			var nextr=this.getNextInCol(r,c);
			if (nextr==-1){
				break;
			}
			else{
				if (this.data[r][c]==0)
				{
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					r--;
				}
				else if(this.data[r][c]==this.data[nextr][c])
				{
					this.data[r][c]*= 2;
					this.score+=this.data[r][c];
					this.data[nextr][c]=0;
				}
			}

		}
	},
	


	getNextInCol:function(r,c)
	{
		for (var nextr=r+1;nextr<this.RN ;nextr++ )
		{
			if (this.data[nextr][c]!=0)
			{
				return nextr;
			}
		}
		return -1;
		
	},
	
	

	moveDown:function()
	{
		var before=String(this.data);
		for (var c=0;c<this.CN ;c++ )
		{
			this.moveDownInCol(c);
		}
		var after=String(this.data);
		if (before!=after)
		{
			this.randomNum();
			this.updateView();
		};
	},
	 


	
	moveDownInCol:function (c){
		
		for (var r=this.RN-1;r>0 ;r-- ){
			var prevr=this.getPrevInCol(r,c);
			if (prevr==-1){
				break;
			}
			else{
				if (this.data[r][c]==0)
				{
					this.data[r][c]=this.data[prevr][c];
					this.data[prevr][c]=0;
					r++;
				}
				else if(this.data[r][c]==this.data[prevr][c])
				{
					this.data[r][c]*= 2;
					this.score+=this.data[r][c];
					this.data[prevr][c]=0;
				}
			}

		}
	},
	


	getPrevInCol:function(r,c)
	{
		for (var prevr=r-1;prevr>=0;prevr-- )
		{
			if (this.data[prevr][c]!=0)
			{
				return prevr;
			}
		}
		return -1;
	},


}




game.start();
console.log(game.data.join("\n"));