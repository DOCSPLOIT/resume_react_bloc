import React from "react";
import { ResumeFormConcept } from "../../blocs/FormData";
export class Resume extends React.Component<{ formData: ResumeFormConcept }, {}> {
    componentDidMount(){
        console.log(this.props.formData);
        
    }
    render(){
        return <>
            {this.props.formData.lastName}
        </>
    }
}
