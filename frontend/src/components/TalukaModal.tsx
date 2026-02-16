import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TeamMemberCard } from './TeamMemberCard';

interface TalukaMember {
  id: string;
  name: string;
  designation: string;
  photo: string; // path from API
}


interface TalukaModalProps {
  isOpen: boolean;
  onClose: () => void;
  talukaName: string;
  members: TalukaMember[];
}

export const TalukaModal = ({ isOpen, onClose, talukaName, members }: TalukaModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{talukaName} Taluka Team</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {members.map((member, index) => (
            <TeamMemberCard
              key={member.id}
    name={member.name}
    designation={member.designation}
    photo={member.photo}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
