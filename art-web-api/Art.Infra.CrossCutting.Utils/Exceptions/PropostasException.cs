namespace System
{
    public class ArtException : Exception
    {
        public ArtException()
        {
        }

        public ArtException(string message)
            : base(message)
        {
        }

        public ArtException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
