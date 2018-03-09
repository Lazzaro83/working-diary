import React, { Component } from 'react';
import { Comment, Divider } from 'semantic-ui-react';
import './PastNotes.css';

class PastNotes extends Component {
  render() {
    return (
			<Comment.Group className='individualNote'>
				<Divider horizontal>{this.props.data[0]}</Divider>
	    	<Comment>
	     		<Comment.Content>
	      			<Comment.Text>
						{this.props.data[1]}
	      			</Comment.Text>
	     		</Comment.Content>
	    	</Comment>
	  	</Comment.Group>
    );
  }
}

export default PastNotes;
