// REVIEWED
export const messages = {
  forms: {
    required(field: string) {
      return ["Please enter your", field].join(" ");
    },
    valid(field: string) {
      return ["Please enter a valid", field].join(" ");
    },
  },
};
