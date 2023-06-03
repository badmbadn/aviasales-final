import React from 'react';
import { Alert } from 'antd';

const ErrorMessage = () => (
  <div className="alert">
    <Alert
      message="Ooops, something gone wrong"
      showIcon
      description="Please refresh page or contact your administrator"
      type="error"
    />
  </div>
);

export default ErrorMessage;
