Modular Architecture: Design the platform to be modular so that different applications can easily integrate with it and customize their confirmation flows.

Flexible Communication Channels: Support various communication channels such as email, SMS, WhatsApp, and potentially others like push notifications or even voice calls.

Configurable Confirmation Flows: Allow users to define their own confirmation flows, including the number of attempts, communication methods, and actions to take based on customer responses or lack thereof.
Template Management: Provide a way for users to create and manage templates for messages sent through different communication channels.

Integration with Existing Systems: Ensure seamless integration with existing dropshipping platforms and other systems by providing well-defined APIs and webhook support.

Customer Response Handling: Implement mechanisms to handle customer responses, whether it's through automated bots, human agents, or predefined actions based on the response content.
Retry Mechanism: Include retry mechanisms for failed confirmation attempts, with configurable retry intervals and limits.
Analytics and Reporting: Offer analytics and reporting features to track confirmation success rates, customer engagement, and other relevant metrics.
Security: Implement robust security measures to protect sensitive customer data and ensure compliance with regulations like GDPR.
Scalability: Design the platform to scale horizontally to handle increasing loads as the number of users and confirmation requests grows.
Monitoring and Logging: Set up monitoring and logging systems to track platform performance, identify issues, and troubleshoot problems effectively.
Documentation and Support: Provide comprehensive documentation and support resources for users and developers to facilitate integration and troubleshooting.

---

Done:
user create app
generate api secret key live and dev
api to create order using the secret key
api to list app orders
check if order already exist before submitting

---

- users can register/login
- user can create an app
- for each app user will get secret api keys for dev or live
- user can create confirmation flows under this app
- each confirmation flow has flow steps
- user can create message templates and attach them with the flow step
- user can set one flow to be executed as the active one with the app
- send emails and have placeholders from customer and order data
