// original show vote

<div className='divOuter'><h3 style={{marginTop:'-1%'}} align='center'><i>Vote Information:</i></h3>
  <div className='voteInfoDiv'>
    { nameState }
    <p className='voteInfoP'><strong>{this.props.votes.vote.vote.desc}</strong></p>
    <p className='voteInfoP'><strong>Vote Will Last:</strong><br />
    <strong>{this.props.votes.vote.vote.length}</strong></p>
    <button className='submitButton' style={{width: '7em'}} onClick={this.onEdit}><span>Edit Vote</span></button>
  </div>
</div>

    <VoteReview review={this.state} handleGoBack={this.handleGoBack.bind(this)} submitFinalVote={this.submitFinalVote} />
