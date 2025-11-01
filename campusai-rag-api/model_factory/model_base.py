from abc import ABC, abstractmethod

class ModelBase(ABC):

    @abstractmethod
    def init(self):
        pass