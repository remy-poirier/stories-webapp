import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as globalActions from "redux/actions/GlobalActions";
import { withRouter } from "react-router";

export default function globalConnect(mappings?: (state: any) => object) {
  return function (component: any): any {
    // eslint-disable-next-line no-underscore-dangle
    return compose(
      withRouter,
      connect(
        (state, ownProps) => (mappings ? mappings(state) : {}),
        (dispatch: any) => globalActions.actionBuilder(dispatch),
      ),
    )(component);
  };
}
