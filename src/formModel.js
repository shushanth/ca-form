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
      sub_questions: [{
        values: ['20-29', '30-39'],
        questions: [{
          id: 4,
          type: 'comment',
          label: 'Tell us what you loved!',
          validation: {
            required: false,
          },
        }, ],
      }, ],
    },
    {
      id: 6,
      type: 'password',
      label: 'Your password',
      validation: {
        required: true,
      },
      sub_questions: [{
        values: ['customer1', 'alliance1'],
        questions: [{
          id: 4,
          type: 'comment',
          label: 'use safety methods!',
          validation: {
            required: false,
          },
        }, ],
      }, ],
    },
    {
      id: 7,
      type: 'email',
      label: 'Your email',
      validation: {
        required: true,
      },
      sub_questions: [{
        values: ['customer@mail.de', 'alliance1@mail.de'],
        questions: [{
          id: 4,
          type: 'comment',
          label: 'did you check your inbox?',
          validation: {
            required: false,
          },
        }, ],
      }, ],
    },
  ],
};