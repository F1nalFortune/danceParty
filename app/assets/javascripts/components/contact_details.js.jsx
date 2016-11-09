var Contact_details = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },

  checkContact_detail: function() {
    var self = this;
    $.ajax({
      url: '/check_contact_detail',
      type: 'PUT',
      data: { contact_detail: { complete: !this.props.complete }, id: this.props.id },
      success: function() {
        self.props.refreshList();
      }
    });
  },

  deleteContact_detail: function() {
    var self = this;
    $.ajax({
      url: '/contact_details/' + this.props.id,
      type: 'DELETE',
      success: function() {
        self.props.refreshContact();
      }
    });
  },

  contact_detail: function() {
    var id = "contact_detail-" + this.props.id;
    var contact_detailClass = 'col s1 ';
    return(<li>
             <div className='row'>
               <div onClick={this.toggleEdit} className='col s1 offset-s2'>
                 {this.props.first}
               </div>
                <div onClick={this.toggleEdit} className={contact_detailClass}>
                 {this.props.last}
               </div>
               <div onClick={this.toggleEdit} className='col s1'>
                 {this.props.email}
               </div>
               <div onClick={this.toggleEdit} className='col s1'>
                 {this.props.request}
               </div>
               <div onClick={this.toggleEdit} className={contact_detailClass}>
                {this.props.question}
                </div>
               <div onClick={this.deleteContact_detail} className='col s1 btn waves-effect'>
                Delete
               </div>
            </div>
           </li>);
  },

  edit: function() {
    return(
      <li>
        <div className='container'>
          <div className='row'>
            <div className='col s10'>
              <form onSubmit={this.updateContact_detail}>
                <input autoFocus={true} type='text' defaultValue={this.props.first} ref='contact_detailsFirst' />
                <input autoFocus={true} type='text' defaultValue={this.props.last} ref='contact_detailsLast' />
                <input autoFocus={true} type='text' defaultValue={this.props.email} ref='contact_detailsEmail' />
                <input autoFocus={true} type='text' defaultValue={this.props.request} ref='contact_detailsRequest' />
                <input autoFocus={true} type='text' defaultValue={this.props.question} ref='contact_detailsQuestion' />
                <button type='submit' className='btn waves-effect'>Submit</button>
              </form>
            </div>
            <div className='col s2'>
             <a className='btn waves-effect' onClick={this.toggleEdit}>Cancel</a>
            </div>
          </div>
        </div>
      </li>
        );
  },

  updateContact_detail: function(e) {
    e.preventDefault();
    var first = ReactDOM.findDOMNode(this.refs.contact_detailsFirst).value;
    var last = ReactDOM.findDOMNode(this.refs.contact_detailsLast).value;
    var email = ReactDOM.findDOMNode(this.refs.contact_detailsEmail).value;
    var request = ReactDOM.findDOMNode(this.refs.contact_detailsRequest).value;
    var question = ReactDOM.findDOMNode(this.refs.contact_detailsQuestion).value;
    var self = this;
    $.ajax({
      url: '/contact_details/' + this.props.id,
      type: 'PUT',
      data: { contact_detail: {
        first: first,
        last: last,
        email: email,
        request: request,
        question: question }
      },
      success: function() {
        self.setState({edit: false});
        self.props.refreshContact();
      }
    });
  },

  render: function() {
    if (this.state.edit)
      return this.edit();
    else
      return this.contact_detail();
  }
});
