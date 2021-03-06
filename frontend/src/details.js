import React, { Component } from 'react';
import './details.css';

class Details extends Component {
	constructor(props){
		super(props);
		const myProps = this.props.eventInfoFromApp;
		this.state = {
			id: myProps.id,
			name: myProps.name,
			invites: myProps.members,
			date: myProps.date[0],
			temporaryDate: "",
			time: myProps.time[0],
			temporaryTime: "",
			todo: myProps.todo,
			temporaryTodo: "",
			checkedIn: myProps.checkedin,
			temporaryCheckedIn: ""
		}
	}

	handleDate(event){
		const date = event.target.value;
		this.setState({
			temporaryDate: date
		})
	}

	handleTime(event){
		const time = event.target.value;
		this.setState({
			temporaryTime: time
		})
	}

	handleTodo(event){
		const todo = event.target.value;
		this.setState({
			temporaryTodo: todo
		})
	}

	handleCheckedIn(event){
		const checkedIn = event.target.value;
		this.setState({
			temporaryCheckedIn: checkedIn
		})
	}

	handleSubmit(event){
		event.preventDefault();

		this.setState({
			date: this.state.temporaryDate
		})

		this.setState({
			time: this.state.temporaryTime
		})

		let updatedTodo = this.state.todo;

		updatedTodo.push(this.state.temporaryTodo);

		this.setState({
			todo: updatedTodo
		})

		console.log(this.state.todo);

		let updatedCheckedIn = this.state.checkedIn;

		updatedCheckedIn.push(this.state.temporaryCheckedIn);

		this.setState({
			checkedIn: updatedCheckedIn
		})

		console.log(this.state.checkedIn);

		var obj = {
			id: this.state.id,
			name: this.state.name,
			invites: this.state.invites,
			date: this.state.temporaryDate.replace(/\s/g, '').split(','),
			time: this.state.temporaryTime.replace(/\s/g, '').split(','),
			todo: this.state.temporaryTodo.replace(/\s/g, '').split(','),
			checkedIn: this.state.temporaryCheckedIn.replace(/\s/g, '').split(','),
			query: ""
		}
		// var new_id = Math.round(Math.random()*100000);
		// obj.createdEventId = new_id;
		var post_req_detail = "addDetails?id=" + obj.id + "&date=" + obj.date + "&time=" + obj.time + "&todo=" + obj.todo +"&checkedIn=" + obj.checkedIn;
		obj.query = post_req_detail;
		console.log(post_req_detail);
		fetch(post_req_detail);
		//this.setState({name: "ddddddd"});
		//console.log(this.state.name);
	}

	render() {
		console.log(this.state.id);
		return(
			<div className="SetDetails">
				<div id="details-title">
					<h2>Details</h2>
				</div>
				<div>
					<strong>Date:</strong> {this.state.date}
				</div>
				<br />
				<div>
					<strong>Time:</strong>  {this.state.time}
				</div>
				<br />
				<div>
					<strong>Responsibilities:</strong>
				</div>
				<ul>
					{this.state.todo.map((to_do) => <li>{to_do}</li>)}
				</ul>
				<br />
				<div>
					<strong>Checked-In:</strong>
				</div>
				<ul>
					{this.state.checkedIn.map((i) => <li>{i}</li>)}
				</ul>


				<br /> <br />

				<button class="btn btn-info" data-toggle="modal" data-target={"#" + this.state.id +"myModal3"} id="details">Edit</button>
		        <div id={this.state.id+"myModal3"} className="modal fade" role="dialog">
		          <div className="modal-dialog">
		            <div className="modal-content">
		              <div className="modal-body">
		                <form>
		                  <label>
		                    Date: <input onChange={this.handleDate.bind(this)} type="text" /> <br />
		                    Time: <input onChange={this.handleTime.bind(this)} type="text" /> <br />
		                    Todo: <input onChange={this.handleTodo.bind(this)} type="text" /> <br />
		                    Checked In: <input onChange={this.handleCheckedIn.bind(this)} type="text" /> <br />
		                  </label>
		                    <br/>
		                    <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} data-dismiss="modal"/>
		                </form>
		              </div>
		            </div>
		          </div>
		        </div>
			</div>
		);
	}
}

export default Details;
