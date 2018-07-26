import * as React from 'react';
import {
  Link,
} from 'react-router-dom'

class View extends React.Component {
  public render() {
    return (
      <div>
        <Link to="/">
          To the auth
        </Link>
        View yo
      </div>
    )
  }
}

export default View;
