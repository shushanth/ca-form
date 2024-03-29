export const FORM_MODEL = {
  questions: [{
      id: 1,
      type: 'rating',
      label: 'How do you feel today?',
      validation: {
        required: true,
      },
      sub_questions: [{
          values: ['1', '2'],
          questions: [{
            id: 3,
            type: 'comment',
            label: 'How can we improve?',
            validation: {
              required: false,
            },
          }, ],
        },
        {
          values: ['4', '5'],
          questions: [{
            id: 4,
            type: 'comment',
            label: 'Tell us what you loved!',
            validation: {
              required: false,
            },
          }, ],
        },
      ],
    },
    {
      id: 5,
      type: 'age',
      label: 'Your age',
      validation: {
        required: false,
      },
      sub_questions: [],
    },
    {
      id: 10,
      type: 'location',
      label: 'How is the weather?',
      validation: {
        required: true,
      },
      sub_questions: [{
          values: ['1', '2'],
          questions: [{
            id: 3,
            type: 'comment',
            label: 'How can we improve?',
            validation: {
              required: false,
            },
          }, ],
        },
        {
          values: ['4', '5'],
          questions: [{
            id: 4,
            type: 'comment',
            label: 'Tell us what you loved!',
            validation: {
              required: false,
            },
          }, ],
        },
      ],
    },
    {
      id: 6,
      type: 'password',
      label: 'Your password',
      validation: {
        required: true,
      },
      sub_questions: [],
    },
    {
      id: 7,
      type: 'email',
      label: 'Your email',
      validation: {
        required: true,
      },
      sub_questions: [],
    }
  ],
};