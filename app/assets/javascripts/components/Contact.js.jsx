//TODO

var Contact = React.createClass({
  getInitialState: function() {
    return { contact_details: [] };
  },

  componentDidMount: function() {
    this.refreshContact();
  },

  refreshContact: function() {
    var self = this;
    $.ajax({
      url: '/contact_details',
      type: 'GET',
      success: function(data) {
        self.setState({ contact_details: data });
      }
    });
  },

  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd});
  },

  submitContact_detail: function(e) {
    e.preventDefault();
    var first = this.state.contact_detailFirst;
    var last = this.state.contact_detailLast;
    var email = this.state.contact_detailEmail;
    var request = this.state.contact_detailRequest;
    var question = this.state.contact_detailQuestion;
    var self = this;
    $.ajax({
      url: '/contact_details',
      type: 'POST',
      data: { contact_detail: {
        first: first,
        last: last,
        email: email,
        request: request,
        question: question }
      },
      success: function(data) {
        var contact_details = self.state.contact_details;
        contact_details.push(data);
        self.setState({ contact_details: contact_details, showAdd: false });
        //                                            was itemName: null^^
      }
    });
  },

  addContact_detailFirst: function(e) {
    this.setState({ contact_detailFirst: e.currentTarget.value });
  },

  addContact_detailLast: function(e) {
    this.setState({ contact_detailLast: e.currentTarget.value });
  },

  addContact_detailEmail: function(e) {
    this.setState({ contact_detailEmail: e.currentTarget.value });
  },

  addContact_detailRequest: function(e) {
    this.setState({ contact_detailRequest: e.currentTarget.value });
  },

  addContact_detailQuestion: function(e) {
    this.setState({ contact_detailQuestion: e.currentTarget.value});
  },

  addContact_detailForm: function() {
    if(this.state.showAdd){
      return(<div className='container'>
              <form onSubmit={this.submitContact_detail}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='First' type='text' onChange={this.addContact_detailFirst} />
                  <input autoFocus='true' placeholder='Last' type='text' onChange={this.addContact_detailLast} />
                  <input autoFocus='true' placeholder='Email' type='text' onChange={this.addContact_detailEmail} />
                  <input autoFocus='true' placeholder='Request' type='text' onChange={this.addContact_detailRequest} />
                  <input autoFocus='true' placeholder='Question' type='text' onChange={this.addContact_detailQuestion} />
                  <button className='btn waves-effect' type='submit'>Submit</button>
                </div>
              </form>
             </div>);
    }
  },

  displayContact_details: function() {
    var contact_details = [];
    for(var i = 0; i < this.state.contact_details.length; i++){
      var contact_detail = this.state.contact_details[i];
      var key = "Contact_detail-" + contact_detail.id;
      contact_details.push(
        <Contact_detail
        refreshContact={this.refreshContact}
        id={contact_detail.id}
        key={key}
        first={contact_detail.first}
        last={contact_detail.last}
        email={contact_detail.email}
        request={contact_detail.request}
        question={contact_detail.question} />);
      //
    }
    return contact_details;
  },

  render: function() {
    return (<div>
              <div className='row'>
                <div className="col s2">First</div>
                <div className="col s2">Last</div>
                <div className="col s2">Email</div>
                <div className="col s2">Request</div>
                <div className="col s2">Question</div>
              </div>
             <div className='card red darken-4 hoverable'>
               <div className='card-content white-text'>
                 <ul>
                   {this.displayContact_details()}
                 </ul>
               </div>
             </div>
               <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add User</a>
             <div className='container'>
               {this.addContact_detailForm()}
             </div>
           </div>);
  }
});
