import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke Tests
it("renders a carousel on the page", () => {
  render(<Carousel />);
  const element = screen.getByText(/shells/i);
  expect(element).toBeInTheDocument();
});

// Snapshot
it("matches existing snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("left arrow disappears when index === 0", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but and the left arrow
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("right arrow disappears when index === 2", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel x2
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the 3rd image to show, but not the right arrow
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
});
