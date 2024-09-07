import reactDomm from 'react-dom';

const portalRoot = document.getElementById('portal');

export default class Portal extends component{

consturctor(){
super();
this.el = document.createElement('div');
}

componentDiMount = () => {
 portalRoot.appendChild(this.el);

}

componentWilUnmount =() =>{
portalRoot.removeChild(this.el);

}


render(){

    const {children} = this.props;

    return reactDomm.createPortal(children, this.el);
}

}