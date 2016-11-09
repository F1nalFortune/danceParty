// REFACTOR TO ES6
// REFERENCE TWITTER_DEMO
var VIP_user = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },

  checkVip_user: function() {
    var self = this;
    $.ajax({
      url: '/check_vip_user',
      type: 'PUT',
      data: { vip_user: { complete: !this.props.complete }, id: this.props.id },
      success: function() {
        self.props.refreshList();
      }
    });
  },

  deleteVip_user: function() {
    var self = this;
    $.ajax({
      url: '/vip_users/' + this.props.id,
      type: 'DELETE',
      success: function() {
        self.props.refreshGuestList();
      }
    });
  },

  vip_user: function() {
    var id = "vip_user-" + this.props.id;
    var vip_userClass = 'col s2 ';
    return(<li>
             <div className='row'>
               <div onClick={this.toggleEdit} className='col s2'>
                 {this.props.first_name}
               </div>
                <div onClick={this.toggleEdit} className={vip_userClass}>
                 {this.props.last_name}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                 {this.props.phone_number}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                 {this.props.college}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                  {this.props.party}
                </div>
               <div onClick={this.deleteVip_user} className='col s2 btn waves-effect'>
                Delete
               </div>
            </div>
           </li>);
  },

  edit: function() {
    return(<li>
            <div className='container'>
              <div className='row'>
                <div className='col s10'>
                 <form onSubmit={this.updateVip_user}>
                   <input autoFocus={true} type='text' defaultValue={this.props.first_name} ref='vip_userFirstname' />
                   <input autoFocus={true} type='text' defaultValue={this.props.last_name} ref='vip_userLastname' />
                   <input autoFocus={true} type='text' defaultValue={this.props.phone_number} ref='vip_userPhone_number' />
                   <input autoFocus={true} type='text' defaultValue={this.props.college} ref='vip_userCollege' />
                   <input autoFocus={true} type='text' defaultValue={this.props.party} ref='vip_userParty' />
                   <input autoFocus={true} type='text' defaultValue={this.props.questions} ref='vip_userQuestions' />
                   <button type='submit' className='btn waves-effect'>Submit</button>
                 </form>
                </div>
                <div className='col s2'>
                 <a className='btn waves-effect' onClick={this.toggleEdit}>Cancel</a>
                </div>
              </div>
            </div>
           </li>);
  },

  updateVip_user: function(e) {
    e.preventDefault();
    var first_name = ReactDOM.findDOMNode(this.refs.vip_userFirstname).value;
    var last_name = ReactDOM.findDOMNode(this.refs.vip_userLastname).value;
    var phone_number = ReactDOM.findDOMNode(this.refs.vip_userPhone_number).value;
    var college = ReactDOM.findDOMNode(this.refs.vip_userCollege).value;
    var party = ReactDOM.findDOMNode(this.refs.vip_userParty).value;
    var self = this;
    $.ajax({
      url: '/vip_users/' + this.props.id,
      type: 'PUT',
      data: { vip_user: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        college: college,
        party: party }
      },
      success: function() {
        self.setState({edit: false});
        self.props.refreshGuestList();
      }
    });
  },

  render: function() {
    if (this.state.edit)
      return this.edit();
    else
      return this.vip_user();
  }
});
