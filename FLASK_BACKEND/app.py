from flask import Flask, request, jsonify
from opal_common.fetcher.fetch_provider import GraphQLFetchProvider
from opal.your_module_path.GraphQLFetcherConfig import MyGraphQLFetcherConfig

app = Flask(__name__)

# Instantiate the GraphQL fetcher
graphql_fetcher = GraphQLFetchProvider(MyGraphQLFetcherConfig)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        # Fetch user data using the GraphQL fetcher
        user_data = graphql_fetcher.fetch(email=email, password=password)

        # Process user data (e.g., verify credentials)
        if user_data:
            # Return user data as response
            return jsonify({'success': True, 'user': user_data})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
