import { pickImageForIndex } from "@/lib/mockApi";
import { useRestaurantStore } from "@/store/restaurantDetailsStore";
import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import RestaurantDetails from "../app/restaurant/[id]";

// Mock the Zustand store
jest.mock("@/store/restaurantDetailsStore", () => ({
  useRestaurantStore: jest.fn(),
}));

// Create a mock restaurant object
const mockRestaurant = {
  id: "sweet-kiwi-001",
  name: "Sweet Kiwi Cafe",
  image: pickImageForIndex(1),
  cuisine: ["Nigerian", "Continental", "Desserts"],
  deliveryTime: { min: 25, max: 45 },
  rating: 4.5,
  priceRange: 2,
  dietaryOptions: ["Vegetarian", "Gluten-Free"],
  isOpen: true,
  location: { latitude: 6.5244, longitude: 3.3792 },
};

describe("RestaurantDetails Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading indicator while fetching", () => {
    (useRestaurantStore as unknown as jest.Mock).mockReturnValue({
      restaurant: null,
      loading: true,
      error: null,
      fetchRestaurant: jest.fn(),
      clearRestaurant: jest.fn(),
    });

    const { getByTestId } = render(<RestaurantDetails />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders restaurant details correctly", async () => {
    (useRestaurantStore as unknown as jest.Mock).mockReturnValue({
      restaurant: mockRestaurant,
      loading: false,
      error: null,
      fetchRestaurant: jest.fn(),
      clearRestaurant: jest.fn(),
    });

    const { getByText } = render(<RestaurantDetails />);
    await waitFor(() => expect(getByText("Mock Cafe")).toBeTruthy());
  });

  it("shows error message when restaurant not found", async () => {
    (useRestaurantStore as unknown as jest.Mock).mockReturnValue({
      restaurant: null,
      loading: false,
      error: "Restaurant not found",
      fetchRestaurant: jest.fn(),
      clearRestaurant: jest.fn(),
    });

    const { getByText } = render(<RestaurantDetails />);
    await waitFor(() => expect(getByText("Restaurant not found")).toBeTruthy());
  });
});
