var GuestList = React.createClass({
  getInitialState: function() {
    return { vip_users: [] };
  },

  componentDidMount: function() {
    this.refreshGuestList();
  },

  refreshGuestList: function() {
    var self = this;
    $.ajax({
      url: '/vip_users',
      type: 'GET',
      success: function(data) {
        self.setState({ vip_users: data });
      }
    });
  },

  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd});
  },

  submitVip_user: function(e) {
    e.preventDefault();
    var first_name = this.state.vip_userFirst_name;
    var last_name = this.state.vip_userLast_name;
    var phone_number = this.state.vip_userPhone_number;
    var college = this.state.vip_userCollege;
    var party = this.state.vip_userParty;
    // var questions = this.state.vip_userQuestions;
    var self = this;
    $.ajax({
      url: '/vip_users',
      type: 'POST',
      data: { vip_user: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        college: college,
        // questions: questions,
        party: party }
      },
      success: function(data) {
        var vip_users = self.state.vip_users;
        vip_users.push(data);
        self.setState({ vip_users: vip_users, showAdd: false });
        //                                            was itemName: null^^
      }
    });
  },

  addVip_userFirst_name: function(e) {
    this.setState({ vip_userFirst_name: e.currentTarget.value });
  },

  addVip_userLast_name: function(e) {
    this.setState({ vip_userLast_name: e.currentTarget.value });
  },

  addVip_userPhone_number: function(e) {
    this.setState({ vip_userPhone_number: e.currentTarget.value });
  },

  addVip_userCollege: function(e) {
    this.setState({ vip_userCollege: e.currentTarget.value });
  },

  // addVip_userQuestions: function(e) {
  //   this.setState({ vip_userQuestions: e.currentTarget.value});
  // },

  addVip_userParty: function(e) {
    this.setState({ vip_userParty: e.currentTarget.value});
  },

  addVip_userForm: function() {
    if(this.state.showAdd){
      return(<div className='container'>
              <form onSubmit={this.submitVip_user}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='First Name' type='text' onChange={this.addVip_userFirst_name} />
                  <input autoFocus='true' placeholder='Last Name' type='text' onChange={this.addVip_userLast_name} />
                  <input autoFocus='true' placeholder='Phone Number' type='text' onChange={this.addVip_userPhone_number} />
                  <input autoFocus='true' placeholder='College' type='text' onChange={this.addVip_userCollege} />
                  <input autoFocus='true' placeholder='Party Size (eg. 5 = ME + 4)' type='text' onChange={this.addVip_userParty} />
                  <button className='btn waves-effect' type='submit'>Submit</button>
                </div>
              </form>
             </div>);
    }
  },

  displayVip_users: function() {
    var vip_users = [];
    for(var i = 0; i < this.state.vip_users.length; i++){
      var vip_user = this.state.vip_users[i];
      var key = "Vip_user-" + vip_user.id;
      vip_users.push(
        <VIP_user
          refreshGuestList={this.refreshGuestList}
          id={vip_user.id}
          key={key}
          first_name={vip_user.first_name}
          last_name={vip_user.last_name}
          phone_number={vip_user.phone_number}
          college={vip_user.college}
          party={vip_user.party}
          // questions={vip_user.questions}
          />);
      //
    }
    return vip_users;
  },

  render: function() {
    return (<div>
              <div className='row'>
                <div className="col s2">First Name</div>
                <div className="col s2">Last Name</div>
                <div className="col s2">Phone</div>
                <div className="col s2">College</div>
                <div className="col s2">Party</div>
              </div>
             <div className='card red darken-4 hoverable'>
               <div className='card-content white-text'>
                 <ul>
                   {this.displayVip_users()}
                 </ul>
               </div>
             </div>
               <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add User</a>
             <div className='container'>
               {this.addVip_userForm()}
             </div>
           </div>);
  }
});



// class GuestList extends React.Component{
//   constructor(props){
//     super(props);
//     this.newVip_user = this.newVip_user.bind(this);
//     this.state = { vip_users: [] }
//   }
//   componentDidMount(){
//     $.ajax({
//       url: '/all_vip_users'
//     }).success( data => {
//       this.setState({vip_users: data.vip_users })
//     })
//   }
//   newBudget(e){
//     e.preventDefault();
//     let vip_users = this.state.vip_users
//     let self = this;
//     $.ajax({
//       url: '/vip_users',
//       type: 'POST',
//       data: { vip_user: { first_name: this.refs.vip_userFirst_name.value, last_name: this.refs.vip_userLast_name.value, email: this.refs.vip_userEmail.value, phone_number: this.refs.vip_userPhone_number.value, college: this.refs.vip_userCollege.value, party: this.refs.vip_userParty.value, questions: this.refs.vip_userQuestions.value }}
//     }).success(data => {
//       // This is where it's failing, figure out why'
//       let vip_users = this.state.vip_users;
//       vip_users.unshift(data);
//       this.refs.budgetName.value = null;
//       this.setState({ vip_users: vip_users });
//     }).error( data => {
//       console.log('erroR');
//     });
//   }

//   render(){
//     let vip_users = [];
//     this.state.vip_users.map( vip_user => {
//       let key = `vip_user-${vip_user.id}`;
//       vip_users.unshift(<vip_user key={key} {...vip_user} />);
//     });
//     return(<div className='container'>
//               <form onSubmit={this.newVip_user}>
//                 <div className='input-field'>
//                   <input type='text' placeholder='vipUser first_name' autoFocus='true' ref='vip_userFirst_name' />
//                   <input type='number' placeholder='vipUser last_name' autoFocus='true' ref='vip_userLast_name' />
//                   <input type='number' placeholder='vipUser email' autoFocus='true' ref='vip_userEmail' />
//                   <input type='number' placeholder='vipUser phone_number' autoFocus='true' ref='vip_userPhone_number' />
//                   <input type='number' placeholder='vipUser college' autoFocus='true' ref='vip_userCollege' />
//                   <input type='number' placeholder='vipUser party' autoFocus='true' ref='vip_userParty' />
//                   <input type='number' placeholder='vipUser questions' autoFocus='true' ref='vip_userQuestions' />
//                   <button type='submit' className='waves-effect waves-light btn'>Submit</button>
//                 </div>
//               </form>
//               {vip_users}
//             </div>
//             );
//   }

// }
