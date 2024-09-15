import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loader from "./Loader";

describe("<Loader />", () => {
  it("renders progress bar", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("progress")).toBeInTheDocument();
  });
});
