import React, { Fragment, useState, useEffect } from 'react';

import Spinner from 'components/layout/Spinner';

import { connect } from 'react-redux';

import { getJira } from 'actions/jira';

const Jira = ({
  getJira,
  auth: { user, isAuthenticated },
  jira: { items, loading },
}) => {
  useEffect(() => {
    getJira();
  }, [getJira]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {isAuthenticated &&
        items.issues &&
        items.issues.length &&
        items.issues.map((issue) => (
          <Fragment key={issue.key}>
            <div>{issue.key}</div>
            <div>{issue.fields.summary}</div>
            <div>{issue.fields.reporter.displayName}</div>
            <div>{issue.fields.created.substring(0, 10)}</div>
          </Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  jira: state.jira,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJira })(Jira);
