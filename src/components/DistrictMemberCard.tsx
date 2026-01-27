import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { API_BASE_URL } from "@/lib/api/config";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Props {
  name: string;
  designation: string;
  photo: string;
}

export const DistrictMemberCard = ({ name, designation, photo }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative overflow-hidden rounded-xl shadow-xl">
          <img
            src={`${API_BASE_URL}/${photo}`}
            alt={name}
            className="
              w-full
              h-[380px]
              sm:h-[420px]
              md:h-[460px]
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {/* Hover overlay */}
          <div className="
            absolute inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition-opacity
            flex items-center justify-center
          ">
            <ZoomIn className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-4 px-2">
          <h3 className="text-lg font-semibold leading-tight">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {designation}
          </p>
        </div>
      </div>

      {/* 🔍 Lightbox Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-2 bg-black">
          <img
            src={`${API_BASE_URL}/${photo}`}
            alt={name}
            className="w-full h-full object-contain rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
