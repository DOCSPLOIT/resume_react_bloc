import React, { ChangeEvent } from "react";
import { BehaviorSubject } from "rxjs";
import { bloc, Education } from "../../blocs/FormData";
import "./index.css";
import MulitStep from "react-multistep";
export class ResumeForm extends React.Component {
  steps = [
    { name: "Step 1", component: <PersonalData /> },
    { name: "Step 2", component: <EducationDetails /> },
  ];
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MulitStep className="card" showNavigation={true} steps={this.steps} />
    );
  }
}

class PersonalData extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  onChange =
    (input: any, type?: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (typeof type === "number") {
        const enuq = [...bloc.subject.value.address];
        enuq[type] = e.target.value;
        bloc.subject.next({ ...bloc.subject.getValue()!, [input]: enuq });
      } else {
        bloc.subject.next({
          ...bloc.subject.getValue()!,
          [input]: e.target.value,
        });
      }
    };
  render() {
    return (
      <>
        <h5 className="mt-3 p-1">Personal Details</h5>
        <div className="form-row ">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={this.onChange("firstName")}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={this.onChange("lastName")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={this.onChange("email")}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              onChange={this.onChange("phone")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address Info 1"
              onChange={this.onChange("address", 0)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              type="tel"
              className="form-control"
              placeholder="Address Info 2"
              onChange={this.onChange("address", 1)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <input
              type="tel"
              className="form-control"
              placeholder="Address Info 3"
              onChange={this.onChange("address", 2)}
            />
          </div>
        </div>
      </>
    );
  }
}

class EducationDetails extends React.Component<{}, { cards: any }> {
  inputs = new BehaviorSubject([1]);
  constructor(props: any) {
    super(props);
    this.state = {
      cards: this.inputs.value.map((t, i) => {
        return (
          <div className="card flex-row  m-2" key={t}>
            <i
              onClick={() => {
                let current = this.inputs.value;
                current = current.filter((t, index) => index !== i);
                this.inputs.next(current);
              }}
              style={{ zIndex: 2, right: 0, top: 0 }}
              className="bi bi-x  plusIcon position-absolute"
            ></i>
            <div className="col-11 justify-content-center mt-1">
              <div className="form-group col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Year (start-end)"
                  onChange={this.onChange("education", 0)}
                />
              </div>
            </div>
          </div>
        );
      }),
    };
    this.inputs.subscribe((data) => {
      this.setState({
        cards: data.map((t, i) => {
          return (
            <div className="card flex-row  m-2" key={t}>
              <i
                onClick={() => {
                  let current = this.inputs.value;
                  current = current.filter((t, index) => index !== i);
                  this.inputs.next(current);
                }}
                style={{ zIndex: 2, right: 0, top: 0 }}
                className="bi bi-x  plusIcon position-absolute"
              ></i>
              <div className="col-11 justify-content-center mt-1">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Year (start-end)"
                    onChange={this.onChange("education", i)}
                  />
                </div>
              </div>
            </div>
          );
        }),
      });
    });
  }
  onChange = (input: string, index: number) => (e: any) => {
    
  };
  render() {
    return (
      <>
        <div className="row justify-content-center align-items-center">
          <h5 className=" p-1 col-11">Education Details</h5>
          <i
            className="bi bi-plus plusIcon"
            onClick={() => {
              let current = this.inputs.value;
              current.push(this.inputs.value[this.inputs.value.length - 1] + 1);
              this.inputs.next(current);
            }}
          ></i>
        </div>
        <div className="col-12">{this.state.cards}</div>
      </>
    );
  }
}
