import renderer from 'react-test-renderer';
import React from "react";
import Spinner from "../Spinner";

describe("<Spinner/>", () => {
  it("rendering visible", () => {
    const tree = renderer.create(<Spinner visible={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("rendering invisible", () => {
    const tree = renderer.create(<Spinner visible={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
