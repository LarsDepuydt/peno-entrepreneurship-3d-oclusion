import Link from 'next/link'

export default function EndVRPage(){ 

    // Redirected to when session has ended on VR side
    return (
        <div>
          <div className="container">
          <div className="message">The scan has been saved successfully. You can exit safely now by closing the window.</div>
            <button>
            <Link href="/wait">Home</Link>
            </button>
          </div>
          <style jsx>{`
          .container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 80%;
              width: 80%;
              padding: 2rem;
              border-radius: 1rem;
              background-color: #f3f3f3;
            }
            .message {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.5rem;
              margin-top: 2rem;
            }
          `}</style>
        </div>
      );
}