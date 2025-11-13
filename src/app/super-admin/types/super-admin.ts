import React from 'react';

export type RemoteMountComponent = React.ComponentType<unknown>;

export interface RemoteModule {
  Mount?: RemoteMountComponent;
  default?: RemoteMountComponent;
}


