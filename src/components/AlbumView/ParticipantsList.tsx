import styles from "./ParticipantsList.module.css";
import users from "../../assets/account-group.svg";

interface Participant {
  displayName: string;
  joinedAt: string;
}

interface ParticipantsListProps {
  participants: Participant[];
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  return (
    <div className={styles.participantsSection}>
      <span className={styles.participantIcon}>
        <img src={users} alt="users" />
      </span>
      <div className={styles.participantsList}>
        {participants.map((p, index) => (
          <span key={index} className={styles.participantBadge}>
            {p.displayName}
          </span>
        ))}
      </div>
    </div>
  );
}
