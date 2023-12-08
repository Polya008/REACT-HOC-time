import React, { useEffect, useState } from 'react';

function WithData(urlFn, dataSaverFn) {
      if (typeof urlFn !== 'function') {
        throw new Error('urlFn is not a function');
      }
      if (typeof dataSaverFn !== 'function') {
        throw new Error('urlFn is not a function');
      }
    
      return function (Component) {
        const func = function (props) {
          const [data, setData] = useState(null);
          const url = urlFn(props);
    
          useEffect(() => {
            fetch(url)
              .then((response) => response.json())
              .then((json) => setData(dataSaverFn(json)));
          }, [props, url]);
    console.log('data',data)
          return <Component {...props} {...data} />;
        };
    
        const componentName = Component.displayName || Component.name || 'Component';
        func.displayName = `WithData${componentName}`;
    
        return func;
      };
    }
    
    function UserDetail({ id, name }) {
      if (!id) {
        return;
      }
    
      return (
        <>
          <h1>User detail</h1>
          <div>
          {name} 
          </div>
          <p>
            ({id})
          </p>
        </>
      );
    }
    
    function SidebarComponent({ id, name, email }) {
      if (!id) {
        return;
      }
    console.log(id, name)
      return (
        <>
          <h1>{name}</h1>
          
          <p>
            {email} ({id})
          </p>
        </>
      );
    }
    
    const userDataDecorator = WithData(
      ({ id }) => `https://jsonplaceholder.typicode.com/users/${id}`,
      (user) => ({ ...user })
    );
    
    export const SidebarWithData = userDataDecorator(SidebarComponent);
    export const UserDetailWithData = userDataDecorator(UserDetail);
    
