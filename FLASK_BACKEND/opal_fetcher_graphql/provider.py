from opal_common.fetcher.fetch_provider import BaseFetchProvider
from opal_common.fetcher.events import FetcherConfig, FetchEvent
from opal_common.logger import logger
from typing import Optional

class User(BaseModel):
    id: str
    name: str
    email: str

class MyGraphQLFetcherConfig(FetcherConfig):
    """
    Config for MyGraphQLFetchProvider.
    """
    fetcher: str = "MyGraphQLFetchProvider"
    db_connection: str  # Postgres connection string
    schema: graphene.Schema
    query: str

class MyGraphQLFetchEvent(FetchEvent):
    """
    Custom FetchEvent subclass for MyGraphQLFetchProvider.
    """
    fetcher: str = "MyGraphQLFetchProvider"
    config: MyGraphQLFetcherConfig

class MyGraphQLFetchProvider(BaseFetchProvider):
    """
    Custom fetch provider for fetching user data from a GraphQL API.
    """
    RETRY_CONFIG = {
        "wait": wait.wait_random_exponential(),
        "stop": stop.stop_after_attempt(10),
        "retry": retry_unless_exception_type(DataError),
        "reraise": True,
    }

    def __init__(self, event: MyGraphQLFetcherConfig) -> None:
        super().__init__(event)
        self.schema = event.schema
        self.query = event.query

    def parse_event(self, event: FetchEvent) -> MyGraphQLFetchEvent:
        """
        Parse a FetchEvent into a MyGraphQLFetchEvent.
        """
        return MyGraphQLFetchEvent(**event.dict(exclude={"config"}), config=event.config)

    async def _fetch_(self) -> Optional[User]:
        """
        Fetch user data from the GraphQL API.
        """
        if not self.schema or not self.query:
            logger.warning("Incomplete fetcher config: Schema and query are required.")
            return None

        logger.debug(f"{self.__class__.__name__} fetching user data")

        result = await self.schema.execute(self.query)
        if result and result.data and result.data.get('user'):
            user_data = result.data.get('user')
            user = User(id=user_data.get('id'), name=user_data.get('name'), email=user_data.get('email'))
            return user
        else:
            logger.warning("No user data returned from GraphQL API.")
            return None

    async def _process_(self, user: User) -> dict:
        """
        Process the fetched user data.
        """
        if user:
            return user.dict()  # Convert User object to dictionary
        else:
            return {}
