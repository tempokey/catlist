import React,{useState} from 'react';
import ReactDOM from 'react-dom';

class ShowCats extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:'',
			male:{gender:'',cats:[]},
			female:{gender:'',cats:[]},
			cats:''
		};
		
		this.handleSearch = this.handleSearch.bind(this);
	}
	
	handleSearch(event) {
		let it = this;
		let url = "http://5c92dbfae7b1a00014078e61.mockapi.io/owners";
	    fetch(url, {
			mode: 'cors',
			headers: {'Content-Type':'application/json'},
	        method: 'GET'
	    }).then(
	        function (res) {
	        console.log(res);
	        res.json().then(function (data) {
	            console.log(data);
				let maleArray = [];
				let femaleArray = [];
				data.map((p) => {
					if (p.gender == "Male"){
						if (p.pets){
							for (var i=0; i< p.pets.length; i++){
								let pet = p.pets[i];
								if (pet.type == "Cat") { 
									maleArray.push(pet.name);
								}
							}
						}
					} else if (p.gender == "Female"){
						if (p.pets){
							for (var i=0; i< p.pets.length; i++){
								let pet = p.pets[i];
								if (pet.type == "Cat") { 
									femaleArray.push(pet.name);
								}
							}
						}
					}
				});
				if(data != null){
					it.setState({
						male: {gender : "Male", cats: maleArray},
						female: {gender : "Female", cats: femaleArray}
					});
				}
	        });
	    });
	}
	
	render() {
		return (
			<div>
				<button class="btn btn-primary" onClick={this.handleSearch}>查询</button>
				<div>
					<div>
						<div>
							<ul>{this.state.male.gender}</ul>
							{
								this.state.male.cats.sort((a, b) => (a > b)).map((cat,i) =>
									<li key = {i}>
										{cat}
									</li>
								)
							}
						</div>
					</div>
					<div>
						<div>
							<ul>{this.state.female.gender}</ul>
							{
								this.state.female.cats.sort((a, b) => (a > b)).map((cat,i) =>
									<li key = {i}>
										{cat}
									</li>
								)
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShowCats;

