import * as yup from 'yup';

export const memeValidationSchema = yup.object().shape({
  title: yup.string().required(),
  image: yup.string().required(),
  upvotes: yup.number().integer(),
  downvotes: yup.number().integer(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
